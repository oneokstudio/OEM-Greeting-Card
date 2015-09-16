 fis.match('::packager', {
   spriter: fis.plugin('csssprites'),
   parser: fis.plugin('sass')
 });

 fis.match('lib/*.js', {
   release : '$&',
   useHash: false
 });

 fis.match('js/*.js', {
   optimizer: fis.plugin('uglify-js'),
   release : '$&',
   useHash: true
 });

 fis.match('css/*.scss', {
   useSprite: true,
   release : '$&',
   useHash: true,
   parser: fis.plugin('sass'),
   rExt: '.css'
 });

 fis.match('*.css', {
   useSprite: true,
   optimizer: fis.plugin('clean-css'),
   useHash: true
 });

 fis.match('img/*.png', {
   optimizer: fis.plugin('png-compressor'),
   release : '$&',
   useHash: true
 });