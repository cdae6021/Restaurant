const sortEnum = Object.freeze({
    NAME_ASC: 1,
    NAME_DESC: 2,
    CATEGORY_ASC: 3,
    LOCATION_ASC: 4
})

function getSortQuery(condition) {
    const result = {}
    switch (condition) {
        case sortEnum.NAME_ASC:
            result.name = 'asc'
            return result
        case sortEnum.NAME_DESC:
            result.name = 'desc'
            return result
        case sortEnum.CATEGORY_ASC:
            result.category = 'asc'
            return result
        case sortEnum.LOCATION_ASC:
            result.location = 'asc'
            return result
    }
}