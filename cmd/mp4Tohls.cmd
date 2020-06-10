ffmpeg -i %1 -profile:v baseline -level 3.0 -s 3840x2160 -start_number 0 -hls_time 10 -hls_list_size 0 -f hls output
pause