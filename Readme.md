#### example NFT tooling projects

this repo contains the possible types of nft projects which can be bulk-automated with regards to review and deploy. this allows for the full spectrum of individuals seeking to create an nft project via a web tool or via pre-compiling a folder-file-metadata package and upload.

each project contains the sample assets, required folder structure, minimum assets, and a JSON project-config and a flat file. only one is necessary and upon uploading, you will be asked which to prefer, however both are options.

#### example-presentations

this folder contains an example of how each project type is presented when embedded in a token.

#### project-config JSON

a template full project-config JSON and txt format with both the minimum required settings and all the possible settings for each type of project. while it may seem overwhelming, we expect that you will simply locate the project type most aligned with your goals and copy the directory entirely. the most common projects have been specifically streamlined to be a
simple as possible, however, having a full suite of features does come with advanced configuration options.

#### custom token contract

likely to be in a separate repo but of note is the ability to include custom contract components which resolve a few expected activities i.e. pricing resolver which computes some pricing based on the token's current supply and tokenUriResolver which renders the token or otherwise controls the token's URI.

#### template projects

certain NFT projects likely will fall under a specific goal or activity, i.e. create project token, create membership passes, such activities should have a template and workflow which are hyper optimized to delivery on the promise of simplicity.

#### project types

-   membership-pass
-   juicebox-project-ve-token
-   vebanny-character-singles
-   vebanny-layers (generative images)
-   meowsdao-images (pre-compiled images)
-   meowsdao-layers (generative images)
-   music-singles (pre-engineered music)
-   music-generative (stem generation music)
-   music-album (more than one audio track per album)
-   p5.js-images (hashed, seed value derived images)
-   p5.js-videos (hash, seed value derived images)
