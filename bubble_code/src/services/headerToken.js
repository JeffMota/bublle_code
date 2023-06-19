
export default function getToken() {
  const config = {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
    }
  }

  return config
}