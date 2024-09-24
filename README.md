uncomment the `.env.production.example` file to `.env.production` and set the correct environment variables for the prod deployment.

run `npx sst deploy --stage production` this will deploy the app to aws and set the correct environment variables.

Hit the page and see that no traces are captured.

I also tried the basic auto-instrumentation for nextjs but that didn't work either.

Any help would be great!

Thanks

Works locally, but so did the base package from vercel. So testing locally is invalid.
