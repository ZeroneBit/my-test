export class EventTypes {
    static Request_File_Infos = 'request_file_infos';
    static Response_File_INfos = 'response_file_infos';
    static Request_File_Chunk = 'request_download_file_chunk';
    static Response_File_Chunk = 'response_download_file_chunk';
};

export class PeerEvents {
    static Peer_Opened = 'peer_opened';
    static Info_Got = 'info_got';
    static File_Got = 'file_got';
    static File_Progress = 'file_progress';
}
