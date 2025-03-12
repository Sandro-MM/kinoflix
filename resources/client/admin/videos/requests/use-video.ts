import {useQuery} from '@tanstack/react-query';
import {apiClient} from '@common/http/query-client';
import {BackendResponse} from '@common/http/backend-response/backend-response';
import {Video} from '@app/titles/models/video';
import {useParams} from 'react-router';

interface Response extends BackendResponse {
  video: Video;
}

export function useVideo() {
  const {videoId} = useParams();
  return useQuery({
    queryKey: ['video', `${videoId}`],
    queryFn: () => fetchVideo(videoId!),
  });
}

function fetchVideo(videoId: number | string) {
  return apiClient
    .get<Response>(`videos/${videoId}`)
    .then(response => response.data);
}
