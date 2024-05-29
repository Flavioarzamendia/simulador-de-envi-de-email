document.addEventListener('DOMContentLoaded', function(){


const email = {
    email:'',
    cc:'no aplica',
    asunto:'',
    mensaje:''
}

    //seleccionar los elementos

    const inputEmail = document.querySelector('#email');
    const inputAsunto = document.querySelector('#asunto');
    const inputMensaje = document.querySelector('#mensaje');
    const formulario = document.querySelector('#formulario');
    const btnSubmit = document.querySelector('#formulario button[type="submit"]');
    const btnReset = document.querySelector('#formulario button[type="reset"]');
    const spinner= document.querySelector('#spinner')
    const inputcc = document.querySelector('#cc');

    //asignar eventos
    
    inputEmail.addEventListener('input', validar);
    inputcc.addEventListener('input', validar);
    inputAsunto.addEventListener('input', validar);
    inputMensaje.addEventListener('input', validar);
    formulario.addEventListener('submit', enviarEmail);
    btnReset.addEventListener('click', function(e){
        e.preventDefault();
        

        resetformulario();
        
    })

    function enviarEmail(e){
        e.preventDefault()
        spinner.classList.add('flex');
        spinner.classList.remove('hidden');

        setTimeout(() =>{
            spinner.classList.remove('flex');
            spinner.classList.add('hidden');

           resetformulario();

           //mostrar alerta
           const alertaExito = document.createElement('P')
           alertaExito.classList.add('bg-green-500', 'text-white', 'p-2', 'text-center', 'rounded-lg', 'mt-10', 'font-bold', 'text-sm', 'uppercase');
           alertaExito.textContent = 'mensaje enviado correctamente';
           formulario.appendChild(alertaExito);

           setTimeout(() => {
            alertaExito.remove();
           },3000);
        }, 3000);
    }

    function validar(e){
        if(e.target.value.trim() == '' && e.target.id !=='cc'){
            mostrarAlerta(`El campo ${e.target.id} es obligatorio`, e.target.parentElement);
            email[e.target.name]= "";
            comprobarEmail();
            return
        }
        

        if(e.target.id ==='email' && !validarEmail(e.target.value)){

            mostrarAlerta('El email no es valido', e.target.parentElement);
            email[e.target.name]= "";
            comprobarEmail();
            
            return
        }

        if(e.target.id ==='cc' && !validarEmail(e.target.value) && e.target.id !== 'email'){

            mostrarAlerta('El email no es valido', e.target.parentElement);
            email[e.target.name]= "";
            comprobarEmail();
            
            return
        }
        


        limpiarAlerta(e.target.parentElement);

        //asignar valores 
        email[e.target.name]= e.target.value.trim().toLowerCase();
       
        //comprobar 

        comprobarEmail()
        
    }


    function mostrarAlerta(mensaje, referencia){

        limpiarAlerta(referencia);


        //generar aleta
        const error = document.createElement('p');
        error.textContent = mensaje;
        error.classList.add('bg-red-600', 'text-white', 'font-bold', 'text-center', 'p-2')

        //inyectar el error al html

        referencia.appendChild(error);
    }


    function limpiarAlerta(referencia){
        const alerta = referencia.querySelector('.bg-red-600');
        
        if(alerta){
            alerta.remove()
        }

    }

    function validarEmail(email){
        const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/ 

        const resultado = regex.test(email);
        return resultado
    }


    function comprobarEmail(){
        if(Object.values(email).includes('') === false){
            btnSubmit.classList.remove('opacity-50')
            btnSubmit.disabled = false;
        }else{
            btnSubmit.classList.add('opacity-50')
            btnSubmit.disabled = true;
        }
    }

   function resetformulario(){
    email.email="";
        email.asunto="";
        email.mensaje="";
        formulario.reset();
        comprobarEmail();
   }

})