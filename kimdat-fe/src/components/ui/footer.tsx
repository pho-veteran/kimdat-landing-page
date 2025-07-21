import { Link } from "react-router";

export function Footer() {
    return (
        <footer className="bg-gradient-to-b from-gray-50 to-white border-t border-border">
            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
                    {/* Column 1: Brand & Slogan */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <img
                                src="/logo.png"
                                alt="KimDat Logo"
                                className="h-12 w-12 object-contain"
                            />
                            <div>
                                <h3 className="text-2xl font-bold text-primary font-mono tracking-widest">
                                    KIMDAT
                                </h3>
                                <p className="text-xs font-medium tracking-wider uppercase text-muted-foreground opacity-70">
                                    Forest Products
                                </p>
                            </div>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
                            Chuyên sản xuất nội thất thủ công từ gỗ, tre, nứa, nhựa giả mây – kết hợp tinh hoa truyền thống và thiết kế hiện đại.
                        </p>
                    </div>

                    {/* Column 2: Policies */}
                    <div className="space-y-6">
                        <h4 className="text-lg font-semibold text-foreground">Chính sách</h4>
                        <nav className="space-y-3">
                            <Link
                                to="/khach-hang-than-thiet"
                                className="block text-sm text-muted-foreground hover:text-primary transition-colors duration-200 hover:translate-x-1 transform"
                            >
                                Khách hàng thân thiết
                            </Link>
                            <Link
                                to="/chinh-sach-giao-nhan"
                                className="block text-sm text-muted-foreground hover:text-primary transition-colors duration-200 hover:translate-x-1 transform"
                            >
                                Chính sách giao nhận
                            </Link>
                            <Link
                                to="/chinh-sach-bao-hanh"
                                className="block text-sm text-muted-foreground hover:text-primary transition-colors duration-200 hover:translate-x-1 transform"
                            >
                                Chính sách bảo hành
                            </Link>
                            <Link
                                to="/chinh-sach-doi-tra"
                                className="block text-sm text-muted-foreground hover:text-primary transition-colors duration-200 hover:translate-x-1 transform"
                            >
                                Chính sách đổi trả sản phẩm
                            </Link>
                        </nav>
                    </div>

                    {/* Column 3: Contact */}
                    <div className="space-y-6">
                        <h4 className="text-lg font-semibold text-foreground">Liên hệ</h4>
                        <div className="space-y-4">
                            {/* Address */}
                            <div className="flex items-start gap-3">
                                <div className="w-5 h-5 mt-0.5 flex-shrink-0 flex items-center justify-center">
                                    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" className="text-primary">
                                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        Cụm Công Nghiệp Phú An, Tây Xuân,
                                        <br />Tây Sơn, Bình Định
                                    </p>
                                </div>
                            </div>

                            {/* Phone */}
                            <div className="flex items-start gap-3">
                                <div className="w-5 h-5 mt-0.5 flex-shrink-0 flex items-center justify-center">
                                    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" className="text-primary">
                                        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                <div className="space-y-1">
                                    <a
                                        href="tel:0914289389"
                                        className="block text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                                    >
                                        0914.289.389
                                    </a>
                                    <a
                                        href="tel:0914520999"
                                        className="block text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                                    >
                                        0914.520.999
                                    </a>
                                </div>
                            </div>

                            {/* Email */}
                            <div className="flex items-start gap-3">
                                <div className="w-5 h-5 mt-0.5 flex-shrink-0 flex items-center justify-center">
                                    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" className="text-primary">
                                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M22 6l-10 7L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                <div className="space-y-1">
                                    <a
                                        href="mailto:congtytnhhkimdat@gmail.com"
                                        className="block text-sm text-muted-foreground hover:text-primary transition-colors duration-200 break-all"
                                    >
                                        congtytnhhkimdat@gmail.com
                                    </a>
                                    <a
                                        href="mailto:nguyennhutvin2@gmail.com"
                                        className="block text-sm text-muted-foreground hover:text-primary transition-colors duration-200 break-all"
                                    >
                                        nguyennhutvin2@gmail.com
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="border-t border-border mt-12 pt-8">
                    <div className="flex justify-center items-center">
                        <p className="text-sm text-muted-foreground">
                            © {new Date().getFullYear()} KimDat Forest Products. Tất cả quyền được bảo lưu.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
