const App = () => {
  return (
    <main className="overflow-x-hidden">
      <Nav />
      <Hero />
      <Colorways />
      <Material />
      <Products />
      <Compatibility />
      <Reviews />
      <Faq />
      <PreOrder />
      <Footer />
    </main>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
