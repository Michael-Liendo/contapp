import useAuth from "@/hooks/useAuth";
import { useState, useEffect } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardHeader, CardTitle, CardFooter, CardContent } from "@/components/ui/card";
import { PencilLine, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TextField } from "@/components/text-field";

export default function Profile() {
  const { user } = useAuth();

  return (
    <Card>
      <CardHeader>
        <div className='flex items-center gap-2 px-1 py-1.5 text-left text-sm mb-2'>
          <Avatar className='h-28 w-28 rounded-lg'>
            <AvatarImage alt={user?.first_name} />
            <AvatarFallback className='rounded-l'>
              {user?.first_name.at(0)}
              {user?.last_name.at(0)}
            </AvatarFallback>
          </Avatar>
        </div>
        <CardTitle>Hola, {user?.first_name}</CardTitle>
        <p className='opacity-50'>Edita tu información de perfil</p>
      </CardHeader>
      <CardContent>
        <form
          id='create-company'
          noValidate
        >
          <div className='flex flex-wrap gap-5'>
            <div className='flex gap-1 w-full sm:w-full lg:w-[35%] space-y-6'>
              <TextField
                label='Correo'
                type='text'
                id='user_email'
                placeholder={user?.email}
                readOnly
              />
              <Button variant='outline' size='icon' className='editField'>
                <PencilLine />
              </Button>
            </div>
            <div className='flex gap-1 w-full sm:w-full lg:w-[30%] space-y-6'>
              <TextField
                label='Nombres'
                type='text'
                id='user_firstname'
                placeholder={user?.first_name}
                readOnly
              />
              <Button variant='outline' size='icon' className='editField'>
                <PencilLine />
              </Button>
            </div>
            <div className='flex gap-1 w-full sm:w-full lg:w-[30%] space-y-6'>
              <TextField
                label='Apellidos'
                type='text'
                id='user_lastname'
                placeholder={user?.last_name}
                readOnly
              />
              <Button variant='outline' size='icon' className='editField'>
                <PencilLine />
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <div className="flex w-full lg:justify-end sm:justify-center">
        <Button variant='default' size='sm'>
          Confirmar cambios
          <Check className='opacity-50' />
        </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
