import React, { useEffect, useRef, useState } from 'react'

const LogoSelector = ({ translate, setData, errors, data }) => {
    const [selectedImage, setSelectedImage] = useState(null)
    const ref = useRef()
    const handleChange = event => {
        const reader = new FileReader()
        if (event.target.files[0]) {
            reader.readAsDataURL(event.target.files[0])
        }
        reader.onload = readerEvent => {
            setData('logo', event.target.files[0])
            setSelectedImage(readerEvent.target.result)
        }
    }

    useEffect(() => {
        if (data.logo) {
            setSelectedImage(route().t.url + '/storage/' + data.logo)
        }
    }, [])

    return (
        <div className={'text-center'}>
            <div
                onClick={() => ref.current.click()}
                className={`w-full p-4 border border-dashed dark:border-gray-600 text-center rounded-lg hover:dark:bg-gray-800 cursor-pointer ${
                    errors.logo && '!border-red-500'
                }`}>
                {selectedImage ? (
                    <div>
                        <img
                            className={'mx-auto'}
                            width={'30%'}
                            src={selectedImage}
                        />
                    </div>
                ) : (
                    <div>{translate('Select logo')}</div>
                )}
            </div>
            <p className={'text-left text-xs text-red-500'}>{errors.logo}</p>
            <input
                onChange={handleChange}
                accept={'image/*'}
                type={'file'}
                ref={ref}
                className={'hidden'}
            />
        </div>
    )
}

export default LogoSelector
