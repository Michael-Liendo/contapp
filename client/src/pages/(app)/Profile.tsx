import useAuth from '@/actions/src/hooks/useAuth';
import { Avatar, AvatarImage, AvatarFallback } from "@/actions/src/components/ui/avatar";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/actions/src/components/ui/card";
import { Button } from '@/actions/src/components/ui/button';
import { Check, PencilLine } from 'lucide-react';
import { TextField } from '@/actions/src/components/text-field';

export default function Profile() {
  const { user, setUser } = useAuth();  // Destructure both 'user' and 'setUser' from 'useAuth'
 
   const confirmUpdateUser = () => {
     const fieldEmail = (document.getElementById('user_email') as HTMLInputElement)?.value;
     const fieldFirstName = (document.getElementById('user_firstname') as HTMLInputElement)?.value;
     const fieldLastName = (document.getElementById('user_lastname') as HTMLInputElement)?.value;
 
     if (user) {
       setUser({
         ...user,
         email: fieldEmail,
         first_name: fieldFirstName,
         last_name: fieldLastName,
       });
     }
     
     
   };
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
          <div className='flex flex-cols-3 flex-rows-3 gap-5 sm:flex-wrap'>
            <div className='flex gap-1 w-full space-y-6'>
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
            <div className='flex gap-1 w-full space-y-6'>
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
            <div className='flex gap-1 w-full space-y-6'>
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
        <Button className='' variant='default' size='sm' onClick={confirmUpdateUser}>
          Confirmar cambios
          <Check className='opacity-50' />
        </Button>
      </CardFooter>
    </Card>
  )
}
