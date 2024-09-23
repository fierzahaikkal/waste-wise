import Step from "./Step";

export default function ConnectSupabaseSteps() {
  return (
    <ol className="flex flex-col gap-6">
      <Step title="Create Supabase project">
        <p>
          Head over to&nbsp
          <a
            href="https://app.supabase.com/project/_/settings/api"
            target="_blank"
            className="font-bold text-foreground/80 hover:underline"
            rel="noreferrer"
          >
            database.new
          </a>
          &nbsp and create a new Supabase project.
        </p>
      </Step>

      <Step title="Declare environment variables">
        <p>
          Rename the&nbsp
          <span className="rounded-md bg-foreground/20 px-2 py-1 text-foreground/80">
            .env.example
          </span>
          &nbsp file in your Next.js app to&nbsp
          <span className="rounded-md bg-foreground/20 px-2 py-1 text-foreground/80">
            .env.local
          </span>
          &nbsp and populate with values from&nbsp
          <a
            href="https://app.supabase.com/project/_/settings/api"
            target="_blank"
            className="font-bold text-foreground/80 hover:underline"
            rel="noreferrer"
          >
            your Supabase project&apos;s API Settings
          </a>
          .
        </p>
      </Step>

      <Step title="Restart your Next.js development server">
        <p>
          You may need to quit your Next.js development server and run&nbsp
          <span className="rounded-md bg-foreground/20 px-2 py-1 text-foreground/80">
            npm run dev
          </span>
          &nbsp again to load the new environment variables.
        </p>
      </Step>

      <Step title="Refresh the page">
        <p>You may need to refresh the page for Next.js to load the new environment variables.</p>
      </Step>
    </ol>
  );
}
