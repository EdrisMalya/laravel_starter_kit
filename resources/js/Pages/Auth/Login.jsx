import React, { useEffect, useState } from 'react'
import Checkbox from '@/Components/Checkbox'
import GuestLayout from '@/Layouts/GuestLayout'
import InputError from '@/Components/InputError'
import InputLabel from '@/Components/InputLabel'
import TextInput from '@/Components/TextInput'
import { Head, Link, useForm } from '@inertiajs/inertia-react'
import { LoadingButton } from '@mui/lab'
import { Alert, IconButton, Snackbar } from '@mui/material'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'

export default function Login({ status, canResetPassword, flash, lang }) {
    const [openMessageBox, setOpenMessageBox] = useState(false)
    const [messageType, setMessageType] = useState('success')
    const [showPassword, setShowPassword] = useState(false)

    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: '',
    })

    useEffect(() => {
        if (flash?.message !== null) {
            setOpenMessageBox(true)
            if (flash?.type) {
                setMessageType(flash?.type)
            }
        }
    }, [flash])

    useEffect(() => {
        return () => {
            reset('password')
        }
    }, [])

    const onHandleChange = event => {
        setData(
            event.target.name,
            event.target.type === 'checkbox'
                ? event.target.checked
                : event.target.value,
        )
    }

    const submit = e => {
        e.preventDefault()

        post(route('login', { lang }))
    }

    return (
        <GuestLayout>
            <Head title="Log in" />

            {status && (
                <div className="mb-4 font-medium text-sm text-green-600">
                    {status}
                </div>
            )}

            <form onSubmit={submit}>
                <div>
                    <InputLabel forInput="email" value="Email" />

                    <TextInput
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        isFocused={true}
                        handleChange={onHandleChange}
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4 flex items-center">
                    <div className={'flex-grow '}>
                        <InputLabel forInput="password" value="Password" />
                        <TextInput
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            value={data.password}
                            className="mt-1 block w-full"
                            autoComplete="current-password"
                            handleChange={onHandleChange}
                        />
                        <InputError
                            message={errors.password}
                            className="mt-2"
                        />
                    </div>
                    <div className={'mt-6'}>
                        <IconButton
                            onClick={() => {
                                setShowPassword(prevState => !prevState)
                            }}>
                            {showPassword ? (
                                <EyeIcon className={'h-5'} />
                            ) : (
                                <EyeSlashIcon className={'h-5'} />
                            )}
                        </IconButton>
                    </div>
                </div>

                <div className="block mt-4">
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            value={data.remember}
                            handleChange={onHandleChange}
                        />
                        <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                            Remember me
                        </span>
                    </label>
                </div>

                <div className="flex items-center justify-between mt-4">
                    {canResetPassword && (
                        <Link
                            href={route('password.request', { lang })}
                            className="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800">
                            Forgot your password?
                        </Link>
                    )}
                    <LoadingButton
                        loading={processing}
                        variant={'outlined'}
                        type={'submit'}>
                        Log in
                    </LoadingButton>
                </div>
            </form>
            <Snackbar
                open={openMessageBox}
                autoHideDuration={3000}
                onClose={() => setOpenMessageBox(false)}>
                <Alert
                    onClose={() => setOpenMessageBox(false)}
                    severity={messageType}
                    sx={{ width: '100%' }}>
                    {flash?.message}
                </Alert>
            </Snackbar>
        </GuestLayout>
    )
}
