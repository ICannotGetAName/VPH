import request from '@/utils/request.js'

export const getCases = data => {
    return request({
        method: 'GET',
        url: 'vph/cases',
        data
    })
}

export const getDiseases = data => {
    return request({
        method: 'GET',
        url: 'vph/diseases',
        data
    })
}

export const getInfos = data => {
    return request({
        method: 'GET',
        url: 'vph/infos',
        data
    })
}

export const getOffices = data => {
    return request({
        method: 'GET',
        url: 'vph/offices',
        data
    })
}

export const getTest = data => {
    return request({
        method: 'GET',
        url: 'vph/test',
        data
    })
}