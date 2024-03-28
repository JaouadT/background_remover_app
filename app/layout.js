import '@styles/globals.css';
import Nav from '@components/Nav';
import Footer from '@components/Footer';

export const metadata = {
  title: 'Remove Background',
  description: 'Remove Image Background For Free',
}

export default function RootLayout({children}) {
 return (
    <html lang="en">
      <body>

      <div className="main" >
        <div className='gradient' />
      </div>
      
      <main className='app'>
        <Nav />
        {children}
        <Footer />
      </main>
      
      </body>
      
    </html>
  )
}
