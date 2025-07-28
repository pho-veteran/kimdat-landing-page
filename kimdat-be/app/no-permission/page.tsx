import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { signOut } from "@/lib/auth"

export default function NoPermissionPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <svg
              className="w-6 h-6 text-red-600"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 18.5c-.77.833.192 2.5 1.732 2.5z"></path>
            </svg>
          </div>
          <CardTitle className="text-2xl font-bold text-red-600">
            Truy Cập Bị Từ Chối
          </CardTitle>
          <CardDescription>
            Bạn không có quyền truy cập tài nguyên này. Vui lòng liên hệ với quản trị viên nếu bạn cho rằng đây là lỗi.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <form
              action={async () => {
                "use server"
                await signOut({ redirectTo: "/login" })
              }}
            >
              <Button type="submit" variant="outline" className="w-full">
                Đăng Xuất
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 