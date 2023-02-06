import React from 'react'
import Authenticated from '@/Layouts/AuthenticatedLayout'
import { TextField } from '@mui/material'
import PermissionGroup from '@/Pages/UserManagement/Role/RoleDetails/PermissionGroup'
import { useForm, usePage } from '@inertiajs/inertia-react'
import { LoadingButton } from '@mui/lab'
import dayjs from 'dayjs'
import ProtectedComponent from '@/Components/ProtectedComponent'
import UserManagementLinks from '@/Pages/UserManagement/UserManagementLinks'
import useLanguage from '@/hooks/useLanguage'

const RoleDetails = ({
    auth,
    active,
    role,
    permissions,
    assigned_permissions,
}) => {
    const [assignedPermissions, setAssignedPermissions] =
        React.useState(assigned_permissions)
    const { lang } = usePage().props
    const { put, processing, setData, errors, data } = useForm({
        assigned_permissions: assignedPermissions,
        name: role.name,
    })

    const { translate } = useLanguage()

    const assignPermission = index => {
        let id = parseInt(index)
        if (assignedPermissions.includes(id)) {
            let newAssignedPermissions = assignedPermissions.filter(obj => {
                return obj !== id
            })
            setAssignedPermissions(newAssignedPermissions)
            setData('assigned_permissions', newAssignedPermissions)
        } else {
            setAssignedPermissions(preventDefault => {
                let newAssignedPermissions = [...preventDefault, id]
                setData('assigned_permissions', newAssignedPermissions)
                return newAssignedPermissions
            })
        }
    }

    const handleSubmit = event => {
        event.preventDefault()
        put(route('role.update', { role: role?.id, lang }))
    }

    return (
        <Authenticated
            auth={auth}
            title={translate('Role details')}
            active={'user_management'}
            navBarOptions={<UserManagementLinks active={active} />}>
            <h2 className={'text-xl py-4'}>Role details</h2>
            <div className={'mb-4 text-xs'}>
                <p>
                    {translate('Created by')}: {role?.created_by?.name} at{' '}
                    {dayjs(role?.created_at).format('YYYY/MM/DD h:m A')}
                </p>
                <p>
                    {role?.updated_by && (
                        <>
                            {translate('Updated by')}: {role?.updated_by?.name}{' '}
                            at{' '}
                            {dayjs(role?.updated_at).format('YYYY/MM/DD h:m A')}
                        </>
                    )}
                </p>
            </div>
            <form onSubmit={handleSubmit}>
                <div className={'flex items-center space-x-2'}>
                    <div className={'flex-grow'}>
                        <TextField
                            error={errors?.name}
                            helperText={errors?.name}
                            onChange={e => setData('name', e.target.value)}
                            value={data.name}
                            fullWidth={true}
                            size={'small'}
                        />
                    </div>
                    <div> - {translate('Role all assigned permissions')}</div>
                </div>
                <div className={'mt-4'}>
                    {permissions?.map(item => (
                        <PermissionGroup
                            permissions={item?.permissions}
                            groups={item?.permission_group}
                            key={item?.id}
                            item={item}
                            assignedPermissions={assignedPermissions}
                            assignPermission={assignPermission}
                            translate={translate}
                        />
                    ))}
                </div>
                <ProtectedComponent role={'roles-edit-role'}>
                    <div className={'mt-4'}>
                        <LoadingButton
                            type={'submit'}
                            variant={'outlined'}
                            loading={processing}>
                            {translate('Save')}
                        </LoadingButton>
                    </div>
                </ProtectedComponent>
            </form>
        </Authenticated>
    )
}

export default RoleDetails
