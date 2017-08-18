# Benjamin Dean + Weebly ==> Working Interview App Docs

This repository contains information relating to Benjamin Dean's work created during his working interview with Weebly.
Please refer to the [project guidelines provided by Weebly](http://developer-advocate-project.weebly.com/requirements.html) if required.

**Work Time Logs**
2017-08-16
14:03:31 - 15:15:17 Prepare workstation, install shell scripts to support ViM as IDE (because GUI IDEs are for the Weenie Hut Jr. Developers...LOL), read directions for 3rd time (ensure I know WHAT is required), author checklist of requirements to make sure I do not forget any important deliverables
15:15:18 - 16:04:56 Create the NodeJS Weebly Cloud API Client interface to construct the signed request hash header (the request)
16:05:51 - 16:25:19 Quick mental and bio break, communicate with wife about time I plan to finish here today
16:25:20 - Complete the NodeJS Weebly Cloud Client interface hasher

## Overview
<!-- DIRECTIONS:
This should explain the high-level overview of what each part of your project does, as well as how each part interacts with the others (i.e. the relationship between the Weebly Cloud API and the Dashboard Card, or how data gets from one to the other)
-->
### Project Goals



## Codebase Tour
<!-- DIRECTIONS:
This section should outline how your code is structure and where each part of the project lives. We're not going to ask for a file-by-file description, but knowing where key files and directories are is a good inclusion
-->

### How The Code is Organized



## Takeaways
<!-- DIRECTIONS:
What parts of the project were easy? What was difficult? Were some API responses or endpoints confusing? Any thoughts you had, good or bad, and articulating what factored into those thoughts should go here.
-->

### Quick Wins

### Challenges

* Weebly Cloud API
    * Understanding how to handle auth with Weebly Cloud API
        * OAuth2 is the industry standard being used predominantly with RESTful APIs (Salesforce, SparkPost, Twilio, RingCentral, etc... all use OAuth2 spec for handling Auth)
        * I would expect to use OAuth2 which supports isomorphic authentication workflows
    * Including the HTTP verb in the hmac hash feels redundant as compared to industry standards (which use the HTTP verbs from the request headers mapped to apporpriate actions rather than requiring developers to explicitly set the verb they are using...just feels weird)
    * Error messages returned from the API were not friendly when getting started (not sure if the newlines should be escaped or not in the hashed content header, required debugging)
        * Why a 300 for "could not route request" instead of being more precise with something such as a 400 (Bad Request), 401 (Forbidden), 403 (Unauthorized User), or some other...more actionable error message?
    * PHP SDK
        * Docs are poor, needs a complete example, too much left to interpretation

* Weebly Apps Docs
    * Issues Encountered
        * Link component missing `link` property in example card stub JSON blob provided in docs
        * Install flow docs state that `site_owner_id` should be supplied in addition to `site_id` in the query params provided during initial callback to app, but it is missing. Either docs or code need updated.

### Opportunities
