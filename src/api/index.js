import { request } from "@/utils/request";

export function getBannerSwiper() {
  return request("/banner", "GET");
}
export function getMusicList(MusicListPage) {
  return request(`/list?MusicListPage=${MusicListPage}`, "GET");
}
export function getDetail(MusicDataId){
  return request(`/detail?id=${MusicDataId}`, "GET");
}
export function getOther() {
  return request(`/other`, "GET");
}