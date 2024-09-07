"use client"
import { Link } from "@nextui-org/react";

export default function Footer() {
  return (
    <footer className="py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center md:text-left">
            <h4 className="text-xl font-bold mb-4 text-blue-600">We are Here to Help</h4>
            <p className="text-gray-600">You are brave for speaking up. We are here to listen and support you.</p>
          </div>
          <div className="text-center md:text-left">
            <h4 className="text-xl font-bold mb-4 text-blue-600">Quick Links</h4>
            <div className="flex flex-col space-y-2">
              <Link href="#" className="text-gray-600 hover:text-blue-500">How to Report</Link>
              <Link href="#" className="text-gray-600 hover:text-blue-500">Safety Tips</Link>
              <Link href="#" className="text-gray-600 hover:text-blue-500">Helpful Resources</Link>
            </div>
          </div>
          <div className="text-center md:text-left">
            <h4 className="text-xl font-bold mb-4 text-blue-600">Need Help Now?</h4>
            <p className="text-gray-600">Call: 1339 (24/7 Helpline)</p>
            <p className="text-gray-600">Chat: Click here to talk to someone</p>
          </div>
        </div>
        <p className="text-center mt-8 text-gray-500">
          © {new Date().getFullYear()} Safe Space for Kids. Your safety matters.
        </p>
      </div>
    </footer>
  );
}