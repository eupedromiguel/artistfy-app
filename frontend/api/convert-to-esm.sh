#!/bin/bash
# Converte os arquivos restantes da API para ES modules

# artist.js
sed -i "s/const { spotifyRequest } = require('.\/lib\/spotify');/import { spotifyRequest } from '.\/lib\/spotify.js';/g" artist.js
sed -i "s/const { handleError, validateParams } = require('.\/lib\/errorHandler');/import { handleError, validateParams } from '.\/lib\/errorHandler.js';/g" artist.js
sed -i "s/module.exports =/export default/g" artist.js

# artist-tracks.js
sed -i "s/const { spotifyRequest } = require('.\/lib\/spotify');/import { spotifyRequest } from '.\/lib\/spotify.js';/g" artist-tracks.js
sed -i "s/const { handleError, validateParams } = require('.\/lib\/errorHandler');/import { handleError, validateParams } from '.\/lib\/errorHandler.js';/g" artist-tracks.js
sed -i "s/module.exports =/export default/g" artist-tracks.js

# artist-albums.js
sed -i "s/const { spotifyRequest } = require('.\/lib\/spotify');/import { spotifyRequest } from '.\/lib\/spotify.js';/g" artist-albums.js
sed -i "s/const { handleError, validateParams } = require('.\/lib\/errorHandler');/import { handleError, validateParams } from '.\/lib\/errorHandler.js';/g" artist-albums.js
sed -i "s/module.exports =/export default/g" artist-albums.js

# lib/tokenCache.js
cd lib
sed -i "s/module.exports = {/export {/g" tokenCache.js
sed -i "s/};$/};/g" tokenCache.js

# lib/errorHandler.js
sed -i "s/module.exports = {/export {/g" errorHandler.js
sed -i "s/};$/};/g" errorHandler.js

echo "Conversão concluída!"
