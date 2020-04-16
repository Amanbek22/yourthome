import React from 'react'


export const validate = values => {
    const errors = {}
    if (!values.headline) {
        errors.headline = 'Обязательное поле'
    } else if (values.headline.length > 0) {
        errors.headline = undefined
    }
    if (!values.price) {
        errors.price = 'Обязательное поле'
    } else if (values.price.length > 0) {
        errors.price = undefined
    }
    if (!values.area) {
        errors.area = 'Обязательное поле'
    } else if (values.area.length > 0) {
        errors.area = undefined
    }
    if (!values.liveArea) {
        errors.liveArea = 'Обязательное поле'
    } else if (values.liveArea.length > 0) {
        errors.liveArea = undefined
    }
    if (!values.rooms) {
        errors.rooms = 'Обязательное поле'
    } else if (values.rooms.length > 0) {
        errors.rooms = undefined
    }
    if (!values.constractionType) {
        errors.constractionType = 'Обязательное поле'
    } else if (values.constractionType.length > 0) {
        errors.constractionType = undefined
    }
    if (!values.floor) {
        errors.floor = 'Обязательное поле'
    } else if (values.floor.length > 0) {
        errors.floor = undefined
    }
    if (!values.floors) {
        errors.floors = 'Обязательное поле'
    } else if (values.floors.length > 0) {
        errors.floors = undefined
    }
    if (!values.apartmentType) {
        errors.apartmentType = 'Обязательное поле'
    } else if (values.apartmentType.length > 0) {
        errors.apartmentType = undefined
    }
    if (!values.description) {
        errors.description = 'Обязательное поле'
    } else if (values.description.length) {
        errors.description = undefined
    }
    if (!values.number) {
        errors.number = 'Обязательное поле'
    } else if (values.number.length) {
        errors.number = undefined
    }
    if (!values.name) {
        errors.name = 'Обязательное поле'
    } else if (values.name.length) {
        errors.name = undefined
    }
    if (!values.state) {
        errors.state = 'Обязательное поле'
    } else if (values.state.length) {
        errors.state = undefined
    }
    return errors
}
