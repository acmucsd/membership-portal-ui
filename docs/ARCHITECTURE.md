# Membership Portal Architecture

The portal is made with a feature-first structure in mind; most files are bunched up as much as possible based on what feature they implement; authentication, store, state management, and so on. Below you’ll find a description of the architecture of our code and how to browse and find what you need.

## Basic Code Structure

Generally, code is spread out in something like this:

- Basic files that run the portal
	- `index.tsx` holds all the routes and pages needed for the portal
	- `redux_*.ts` are merely managers for our Redux store, which include all the various states for each feature of the portal
	- `storage.ts`, a bind to Local Storage
	- `config.ts`, a default export of various configuration variables that are used by the portal. Some are overridden by environment variables.
	- `types.ts`, types shared across multiple features
	- `utils.tsx`, one-off functions useful for simplifying code on the spot
- A styles folder, containing our mixins, resets and variables
- Folders containing features of the website
	- Each feature has its necessary types under `featureTypes.ts`, its API calls in `featureActions.ts` and its state management in `adminReducer.ts`.
	- Each feature also has a `containers` folder, holding the pages related to the feature, if any (such as, the store item page). Typically, the containers bind Redux, our store manager, to the components themselves.
	- Each feature also has a `components` folder, holding any reused components for each page, if any. (such as the admin create event form).

# Glossary

Here’s a list of terms we use around the portal, along with definitions for each of them.

TODO: Fix this up.
