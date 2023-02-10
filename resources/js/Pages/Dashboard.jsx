import React, { useEffect } from "react"
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/inertia-react'
import useLanguage from '@/hooks/useLanguage'
import { Button } from "@mui/material"
import { Inertia } from "@inertiajs/inertia"

export default function Dashboard(props) {
    const { translate } = useLanguage()
    useEffect(()=>{
        window.Echo.private('testchannel')
            .listen('Test', (e) => {
                console.log(e)
            }).subscribe()
    }, [])

    return (
        <AuthenticatedLayout
            active={'dashboard'}
            auth={props.auth}
            errors={props.errors}>
            <Head title="Dashboard" />
            <Button onClick={()=>{
                Inertia.get(route('first.test.event', {lang: props.lang}))
            }}>
                Fire event
            </Button>
            <div className=" h-screen flex justify-center items-center">
                <div className=" shadow-md rounded p-8">
                    <h1 className="text-2xl font-bold text-primary">
                        {translate('Welcome to the Dashboard')}
                    </h1>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
