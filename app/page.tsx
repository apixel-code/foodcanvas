import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import WhyUs from '@/components/WhyUs'
import Products from '@/components/Products'
import HowToOrder from '@/components/HowToOrder'
import Reviews from '@/components/Reviews'
import ContactBar from '@/components/ContactBar'
import OrderForm from '@/components/OrderForm'
import OrderTracking from '@/components/OrderTracking'
import FAQ from '@/components/FAQ'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main style={{ background: 'var(--color-cream)', overflowX: 'hidden', width: '100%' }}>
      <Navbar />
      <Hero />
      <WhyUs />
      <Products />
      <HowToOrder />
      <Reviews />
      <ContactBar />
      <OrderForm />
      <OrderTracking />
      <FAQ />
      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: 'Food Canvas — হিমসাগর আম',
            description:
              'Food Canvas — রাজশাহীর সরাসরি বাগান থেকে সংগ্রহ করা তাজা হিমসাগর আম। ১০০% কেমিক্যাল মুক্ত।',
            offers: {
              '@type': 'Offer',
              priceCurrency: 'BDT',
              price: '140',
              availability: 'https://schema.org/InStock',
            },
          }),
        }}
      />
    </main>
  )
}
