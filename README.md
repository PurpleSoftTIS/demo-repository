Comando de git:

git branch
Con este comando, sabrar en que rama te encuantra y tambien te mostrara la ramas que hayas creado localmente y remotamente 

git branch nombre_de_la_rama
Con este comando vamos estar creando una nueva rama local

git status
Con este comando sabras los cambios guardados y nos guardados que hayas tenido en tu rama actual

git switch
Con este comando podran ir altermando entre rama y rama 

git add .
Con este comando vamos a guardar los cambios mostrador con el comando git status de manera local

git commit -m "Mensaje descriptivo"
Con este momando vamos guardar los cambios mostrador con el comando git status de manera local, este procedimiento se guardara 

git pull
Con este comando vamos bajar los cambios a nuestra rama

git push
Con este comando vamos subir al repositorio la rama

git pull origin nombre_de_rama
Con este comando vamos bajar los cambios de una rama salecionada a nuestra rama

git push origin nombre_de_rama
Con este comando vamos subir al repositorio en una rama especifica nuestro cambios la rama

git merge
Esto nos sirve para unir dos ramas, tenga cuidado y hya cinflintos 

git log
Con este comando vamos ver el historia de commits de todos lo colaboradores

Ejecuion del Frontend
npm install
npm start

Ejecuion del Backend
php artisan serve

IMPORTANTE 
- Asegurece de estar en la ram correcta 
- Antes de subir cambios, siempre ejecute git pull origin nombre_de_rama, este en caso de estar trabanjando con otra perosna en una misma rama
- No olvide no puede subir cambios a la main si antes entrar en concenso con el resto de colaboradores 
 
php -S 127.0.0.1:8000 -t public