import { auth } from "@/lib/auth"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { signOut } from "@/lib/auth"
import { redirect } from "next/navigation"
import prisma from "@/lib/prisma"

export default async function DashboardPage() {
  const session = await auth()
  
  if (!session?.user?.email) {
    redirect("/login")
  }

  // Get user from database with role
  const user = await prisma.user.findUnique({
    where: { email: session.user.email }
  })

  if (!user) {
    redirect("/login")
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <form
            action={async () => {
              "use server"
              await signOut({ redirectTo: "/login" })
            }}
          >
            <Button type="submit" variant="outline">
              Sign Out
            </Button>
          </form>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Welcome to Kimdat Dashboard</CardTitle>
            <CardDescription>
              You have successfully logged in with {user.role} privileges.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Role:</strong> <span className={`px-2 py-1 rounded text-sm font-medium ${
                user.role === 'ADMIN' ? 'bg-red-100 text-red-800' :
                user.role === 'STAFF' ? 'bg-blue-100 text-blue-800' :
                'bg-green-100 text-green-800'
              }`}>{user.role}</span></p>
              <p><strong>Name:</strong> {session.user.name || "Not provided"}</p>
            </div>
          </CardContent>
        </Card>

        {/* Environment Variables Debug Card */}
        <Card>
          <CardHeader>
            <CardTitle>Environment Variables (Debug)</CardTitle>
            <CardDescription>
              Current environment configuration for debugging
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p><strong>NODE_ENV:</strong> <code className="bg-gray-100 px-2 py-1 rounded text-sm">{process.env.NODE_ENV || 'Not set'}</code></p>
                  <p><strong>DATABASE_URL:</strong> <code className="bg-gray-100 px-2 py-1 rounded text-sm break-all">{process.env.DATABASE_URL ? 'Set (hidden for security)' : 'Not set'}</code></p>
                  <p><strong>AUTH_SECRET:</strong> <code className="bg-gray-100 px-2 py-1 rounded text-sm">{process.env.AUTH_SECRET ? `${process.env.AUTH_SECRET.substring(0, 8)}...` : 'Not set'}</code></p>
                  <p><strong>AUTH_GOOGLE_ID:</strong> <code className="bg-gray-100 px-2 py-1 rounded text-sm">{process.env.AUTH_GOOGLE_ID || 'Not set'}</code></p>
                </div>
                <div>
                  <p><strong>AUTH_GOOGLE_SECRET:</strong> <code className="bg-gray-100 px-2 py-1 rounded text-sm">{process.env.AUTH_GOOGLE_SECRET ? 'Set (hidden for security)' : 'Not set'}</code></p>
                  <p><strong>AUTH_TRUST_HOST:</strong> <code className="bg-gray-100 px-2 py-1 rounded text-sm">{process.env.AUTH_TRUST_HOST || 'Not set'}</code></p>
                  <p><strong>NEXTAUTH_URL:</strong> <code className="bg-gray-100 px-2 py-1 rounded text-sm">{process.env.NEXTAUTH_URL || 'Not set'}</code></p>
                  <p><strong>NEXTAUTH_SECRET:</strong> <code className="bg-gray-100 px-2 py-1 rounded text-sm">{process.env.NEXTAUTH_SECRET ? `${process.env.NEXTAUTH_SECRET.substring(0, 8)}...` : 'Not set'}</code></p>
                </div>
              </div>
              
              {/* All Environment Variables (Collapsible) */}
              <details className="mt-4">
                <summary className="cursor-pointer font-medium text-blue-600 hover:text-blue-800">
                  Show All Environment Variables
                </summary>
                <div className="mt-2 p-3 bg-gray-50 rounded border">
                  <pre className="text-xs overflow-x-auto">
                    {Object.entries(process.env)
                      .filter(([key]) => key.startsWith('AUTH_') || key.startsWith('DATABASE_') || key.startsWith('NEXT') || key === 'NODE_ENV')
                      .map(([key, value]) => {
                        // Mask sensitive values
                        const displayValue = key.includes('SECRET') || key.includes('PASSWORD') || key === 'DATABASE_URL'
                          ? value ? '***HIDDEN***' : 'Not set'
                          : value || 'Not set';
                        return `${key}=${displayValue}`;
                      })
                      .join('\n')}
                  </pre>
                </div>
              </details>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Reports</CardTitle>
              <CardDescription>View and generate system reports</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">View Reports</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Data Management</CardTitle>
              <CardDescription>Manage system data and configurations</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" variant="secondary">
                Manage Data
              </Button>
            </CardContent>
          </Card>

          {user.role === 'ADMIN' && (
            <Card>
              <CardHeader>
                <CardTitle>Admin Tools</CardTitle>
                <CardDescription>Administrative functions</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" variant="destructive">
                  Admin Functions
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
} 