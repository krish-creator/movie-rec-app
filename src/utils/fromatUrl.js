const formatUrl = (base_url, backdrop_path) => {
    const posterSize = 'w600_and_h900_bestv2'//config ? config.images.profile_sizes[2] : null
    return base_url + posterSize + backdrop_path
}

export default formatUrl