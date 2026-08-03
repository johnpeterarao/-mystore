General
The lookbooks must render with React. (Done)
● Product prices must be displayed in the correct currency. (Done)
● Product details must be fetched using the Storefront API. (Done)

Lookbook Theme Sections
● Create a new section in the Shopify theme customizer for lookbooks. (Done)
● Allow the lookbook section to be added to the home page and customized by theme settings. (Done)
● The section must allow the client to choose which lookbook to display. (Done)

Lookbook on Product Pages:
● Lookbooks should render on the product page if a section is configured to do so. (Done)
● This section should not allow the selection of a specific lookbook. (Done)
● Other customisation settings should be identical with the homepage section. (Done)
● Display lookbooks on product pages if the product appears inside any of the lookbooks. (Done)
● Display a maximum of two lookbooks if a product appears in three or more lookbooks. (Done)


Technical Specifications
Creating Lookbook Metaobjects:
● Define a metaobject schema for lookbooks with attributes such as title, description, and a list of products. (Done)
● Ensure the metaobjects can be easily managed via the Shopify admin interface. (Done)

Rendering Lookbook Sections:
● Develop Liquid templates for rendering lookbook sections. (Done)
● Ensure the sections are configurable through the theme customizer, allowing users to select specific lookbooks to display. (Done)


Developer explanation:
Files:
lookbook.liquid - I structured here the data that I need for grapql and section settings using liquid's capture. I added a [data-react-section] attribute tag as identifier that the element will be a react root element.

main.jsx - here I loop for every [data-react-section] and parsed the config attribute to become a js object which I also pass to App.jsx

app.jsx - here I mapped the section needed. I structured it this way so that for future other react components, this will be their entry point. 

sections/lookbook/index.jsx - This is the whole section for the lookbook, I used React's native way of implementing css per line. I think adding tailwind at this point is a luggage since we only need it for 1 section. But rest assured that I have experience in using tailwindcss,bootstrap, foundation, scss and css. Here is where I call the API for getting lookbook. 

lookbookService.js - Here you will see the API which gets the lookbook information using storefrontFetch. I also include fetching for products details using getProducts. After fetching, I mapped the data an object containing title, description, image, and products. 

storefront.js - This is a reusable API service call for graphql, receiving graphql query and variables as parameter

components/lookookCard/index - This is a component for every lookbook products, containing its own css file. 


Folder structure & repository - For bigger react purposes, we make a separate git repository for it. For now, I just created a git for the whole project/assessment. For easier and faster set-up. 


lookbook-product.liquid - For lookbook product page, I have to create a separate file. As part of the requirements, user is not allowed to pick any lookbook. 

lookbookSection.jsx - to utilize the usage of components, I converted the whole section to a reusable component. This is also for each section to have their own slider and state. 

lookbookService.js - this is where I placed mapping of data and getting metaobjects. What I did is, collect all metaobjects registered to lookbook(first 15), filtered the data to only give back the lookbook which the current product is registered and return lookbooks in an array, looped this array and reuse getLookbook function. To ensure all data is waited before returning, I used promise.all. Then applied the section