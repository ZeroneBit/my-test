import streamSaver from 'streamsaver';

export default class MyFile {
    constructor(options) {
        this.size = options.size;
        this.name = options.name;

        this.lastAppendTime = new Date();
        this.received = 0;

        this.fileStream = null;
        this.writer = null;
    }

    append(data, done) {
        this._ensureFileStreamWriter((writer) => {
            const blob = new Blob([data]);
            const readableStream = blob.stream();
            const reader = readableStream.getReader();
            const pump = () => reader.read()
                .then(res => {
                    if (res.done) {
                        let speed = this._calculateSpeed(data.byteLength);
                        let progress = this._calculateProgress(data.byteLength);
                        done(speed, progress);
                    } else {
                        writer.write(res.value).then(pump);
                    }
                });

            pump();
        });
    }

    close() {
        if (this.writer) {
            this.writer.close();
            this.writer = null;
        }
    }

    abort() {
        if (this.writer) {
            this.fileStream.abort();
            this.writer.abort();
        }
    }

    _calculateProgress(byteLength) {
        this.received += byteLength;
        let progress = 100 * this.received / this.size;

        return progress;
    }

    _calculateSpeed(byteLength) {
        let time = new Date();
        let milliseconds = time.getTime() - this.lastAppendTime.getTime();

        this.lastAppendTime = time;

        let speed = 1000 * byteLength / milliseconds;

        return speed;
    }

    _ensureFileStreamWriter(callback) {
        if (this.writer) {
            callback && callback(this.writer);
        } else {
            this._polifill(() => {
                streamSaver.WritableStream = window.WritableStream || window.WebStreamsPolyfill.WritableStream;
                this.fileStream = streamSaver.createWriteStream(
                    this.name,
                    { size: this.size, }
                );
                this.writer = this.fileStream.getWriter();
                callback && callback(this.writer);
            });
        }
    }

    _polifill(callback) {
        if (callback.done) {
            callback();
        } else {
            Object.defineProperty(Blob.prototype, 'stream', {
                configurable: true,
                enumerable: true,
                writable: true,
                value: function stream() {
                    return new Response(this).body;
                }
            });

            let js = document.createElement('script');
            js.setAttribute('src', 'https://cdn.jsdelivr.net/npm/web-streams-polyfill@2.0.2/dist/ponyfill.min.js');
            js.async = true;
            js.onreadystatechange = js.onload = () => {
                if (!callback.done && (!js.readyState || /loaded|complete/.test(js.readyState))) {
                    callback.done = true;
                    callback();
                }
            };
            document.getElementsByTagName('head')[0].appendChild(js);
        }
    }
}