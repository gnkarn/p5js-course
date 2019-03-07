# p5js-course
practica de p5js
procedimiento para edicion y publicacion
en terminal uso https://ohmyz.sh/

asociar git con el editor
git config --global core.editor "code --wait"

en el config de code agregar:
In your preferred text editor, open or create a ~/.profile file and add this line:
 export PATH=~/.npm-global/bin:$PATH
y luego activarlo con :source ~/.zshrc


instalar p5 manager  https://www.npmjs.com/package/p5-manager
necesita NODE, si se instala Global , entonces necesita sudo
npm install p5-manager -g

instalacion de live server
npm install live-server -g


algunos comandos de git
git config user.name "" --global
git config user.email ""  --global

git status
git branch source
git branch -v  , da mas info
git push

desde el directorio donde voy a colocar los proyectos , se ejecuta:
uso p5-manager para dar de alta el proyecto desde CLI : p5 generate --bundle "p5jsProy_prototypes"
 p5js-course git:(p5js-proy) ✗ code .   abre  el editor
 p5js-course git:(p5js-proy) ✗ live-server     inicia el servidor
 una vez terminado el código, hago commit , desde CODE 
luego en terminal  git push
y desde GitHub  hago la comparación y el merge desde el branch que uso para desarrollo ., al branch donde lo publico git-pages

link para demos: change project name to test other example
https://gnkarn.github.io/p5js-course/p5jsProy_fluid_sim
