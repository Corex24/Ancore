{ pkgs }: {
  deps = [
    pkgs.nodejs_20
    pkgs.git
    pkgs.ffmpeg
    pkgs.python3
    pkgs.sqlite
    pkgs.wget
    pkgs.curl
    pkgs.unzip
  ];
}
