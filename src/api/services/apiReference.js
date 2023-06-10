import apiUrls from '../../api/utils/apiUrls.json'

const apiReference = async (serviceUrl) => {

    const baseUrl = apiUrls.baseUrl
    const url = baseUrl + serviceUrl
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NmYwYTBiMDc4NTAzMzc3NjIxZDllNGFjMWM0ZjI3NyIsInN1YiI6IjY0N2JiNDA4OTM4MjhlMDBiZjllNzdiOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ICGHO7NSDS-xjL9CHNfM-Q-T65R8AD9OIJhZbra17Ok'
        }
    };

    try {
        const res = await fetch(url, options)
        return await res.json()
    } catch (err) {
        return console.error('error:' + err)
    }

}

export default apiReference