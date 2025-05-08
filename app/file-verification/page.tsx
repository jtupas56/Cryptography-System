import { Navbar } from "@/app/components/navbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function FileVerificationPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 container py-12">
        <h1 className="text-3xl font-bold">File Verification</h1>
        <p className="mt-2 text-muted-foreground">Verify the integrity and authenticity of your files.</p>

        <div className="mt-8 grid gap-8 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Hash Verification</CardTitle>
              <CardDescription>Verify a file's integrity by checking its hash value.</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="file">Upload File</Label>
                  <Input id="file" type="file" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hash">Expected Hash (SHA-256)</Label>
                  <Input id="hash" placeholder="Enter the expected hash value" />
                </div>
                <Button type="submit" className="w-full">
                  Verify File
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Digital Signature Verification</CardTitle>
              <CardDescription>Verify that a file was signed by a trusted source.</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signed-file">Upload Signed File</Label>
                  <Input id="signed-file" type="file" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signature">Upload Signature</Label>
                  <Input id="signature" type="file" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="public-key">Upload Public Key</Label>
                  <Input id="public-key" type="file" />
                </div>
                <Button type="submit" className="w-full">
                  Verify Signature
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>How File Verification Works</CardTitle>
                <CardDescription>Learn about the technology behind our file verification system.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p>
                    Our file verification system uses cryptographic hash functions and digital signatures to verify the
                    integrity and authenticity of files.
                  </p>
                  <div className="space-y-2">
                    <h3 className="font-semibold">Hash Verification</h3>
                    <p className="text-sm text-muted-foreground">
                      Hash verification uses cryptographic hash functions like SHA-256 to generate a unique fingerprint
                      of a file. By comparing the hash of your file with the expected hash, you can verify that the file
                      hasn't been modified.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold">Digital Signature Verification</h3>
                    <p className="text-sm text-muted-foreground">
                      Digital signature verification uses public-key cryptography to verify that a file was signed by a
                      trusted source. The signer uses their private key to create a signature, and you can verify the
                      signature using their public key.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <footer className="py-6 border-t">
        <div className="container px-4 mx-auto text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} NextAuth. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
