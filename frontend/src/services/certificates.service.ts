import { certificateAPI } from "../api"

export async function fetchCertificates() {
  return await certificateAPI.listCertificates()
}

export async function uploadCertificateService(formData: FormData) {
  return await certificateAPI.uploadCertificate(formData)
}

export async function deleteCertificateService(id: number) {
  return await certificateAPI.deleteCertificate(id)
}

export function getCertificateDownloadUrl(id: number) {
  return certificateAPI.downloadCertificateUrl(id)
}
