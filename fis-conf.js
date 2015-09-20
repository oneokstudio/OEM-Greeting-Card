 fis.match('::packager', {
   spriter: fis.plugin('csssprites'),
   parser: fis.plugin('sass')
 });

 fis.match('lib/*.js', {
   release : 'OEM-Greeting-Card/$0',
   useHash: false
 });

 fis.match('js/*.js', {
   //optimizer: fis.plugin('uglify-js'),
   release : 'OEM-Greeting-Card/$0',
   useHash: true
 });

 //fis.match('css/*.scss', {
 //  useSprite: true,
 //  release : '$&',
 //  useHash: true,
 //  parser: fis.plugin('sass'),
 //  rExt: '.css'
 //});

 fis.match('*.css', {
   optimizer: fis.plugin('clean-css'),
   release : 'OEM-Greeting-Card/$0',
   useSprite: true,
   useHash: true
 });

 fis.match('img/*.png', {
   optimizer: fis.plugin('png-compressor'),
   release : 'OEM-Greeting-Card/$0',
   useHash: true
 });