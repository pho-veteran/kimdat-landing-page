import { Button } from "@/components/ui/button";
import { auth, signIn, signOut } from "@/lib/auth";
import Image from "next/image";

export default async function Home() {
  const session = await auth();

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-8 row-start-2 items-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Auth Testing Page</h1>
          <p className="text-gray-600 mb-8">Testing NextAuth.js with Google Provider</p>
        </div>

        {session ? (
          <div className="flex flex-col items-center gap-6 p-6 border rounded-lg bg-green-50 dark:bg-green-900/20">
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-green-800 dark:text-green-200 mb-2">
                Welcome, {session.user?.name}!
              </h2>
              <p className="text-green-600 dark:text-green-300 mb-4">
                You are successfully signed in
              </p>
              
              {session.user?.image && (
                <Image
                  src={session.user.image}
                  alt="Profile picture"
                  width={64}
                  height={64}
                  className="rounded-full mx-auto mb-4"
                />
              )}
              
              <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md mb-4">
                <h3 className="font-semibold mb-2">Session Info:</h3>
                <p className="text-sm"><strong>Name:</strong> {session.user?.name}</p>
                <p className="text-sm"><strong>Email:</strong> {session.user?.email}</p>
                <p className="text-sm"><strong>Provider:</strong> Google</p>
              </div>
            </div>
            
            <form
              action={async () => {
                "use server";
                await signOut();
              }}
            >
              <Button type="submit" variant="destructive">
                Sign Out
              </Button>
            </form>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-6 p-6 border rounded-lg bg-blue-50 dark:bg-blue-900/20">
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-blue-800 dark:text-blue-200 mb-2">
                Not Signed In
              </h2>
              <p className="text-blue-600 dark:text-blue-300 mb-4">
                Sign in with Google to test authentication
              </p>
            </div>
            
            <form
              action={async () => {
                "use server";
                await signIn("google");
              }}
            >
              <Button type="submit" className="flex items-center gap-2">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Sign in with Google
              </Button>
            </form>
          </div>
        )}

        <div className="mt-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <h3 className="font-semibold mb-2">Authentication Status:</h3>
          <p className="text-sm">
            Session: {session ? "✅ Active" : "❌ Not authenticated"}
          </p>
          {session && (
            <p className="text-sm mt-1">
              Expires: {session.expires ? new Date(session.expires).toLocaleString() : "No expiration"}
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
