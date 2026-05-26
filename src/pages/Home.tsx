import { Link } from "react-router-dom";

const Home = () => {

  return (

    <div className="min-h-screen bg-gray-100">

      {/* NAVBAR */}

      <nav className="bg-white shadow-md px-10 py-5 flex justify-between items-center">

        <h1 className="text-3xl font-bold text-blue-600">
          FairFundz
        </h1>

        <div className="flex gap-4">

          <Link to="/login">

            <button className="px-5 py-2 rounded-lg border border-blue-600 text-blue-600 hover:bg-blue-50">

              Login

            </button>

          </Link>

          <Link to="/register">

            <button className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700">

              Register

            </button>

          </Link>

        </div>

      </nav>

      {/* HERO SECTION */}

      <section className="h-[85vh] bg-gradient-to-r from-blue-600 to-green-500 flex flex-col justify-center items-center text-center text-white px-5">

        <h1 className="text-6xl font-bold mb-6">

          Fair Wages, Fair Future

        </h1>

        <p className="text-2xl max-w-4xl mb-8">

          Empower your business with FairFundz — ensuring compliance,
          transparency, and worker satisfaction through our innovative
          wage distribution platform.

        </p>

        <Link to="/register">

          <button className="bg-white text-blue-600 px-8 py-4 rounded-xl text-xl font-semibold hover:bg-gray-200">

            Get Started

          </button>

        </Link>

      </section>

      {/* WHY CHOOSE */}

      <section className="py-20 px-10 bg-white">

        <div className="text-center mb-16">

          <h2 className="text-5xl font-bold mb-4">

            Why Choose FairFundz?

          </h2>

          <p className="text-gray-600 text-xl">

            Comprehensive solutions for fair wage management

          </p>

        </div>

        <div className="grid md:grid-cols-3 gap-10">

          {/* CARD 1 */}

          <div className="bg-gray-100 p-8 rounded-2xl shadow hover:shadow-xl transition">

            <div className="text-5xl mb-5">
              💰
            </div>

            <h3 className="text-2xl font-bold mb-4">

              Smart Payroll

            </h3>

            <p className="text-gray-600">

              Automate worker salary management and payment tracking.

            </p>

          </div>

          {/* CARD 2 */}

          <div className="bg-gray-100 p-8 rounded-2xl shadow hover:shadow-xl transition">

            <div className="text-5xl mb-5">
              👷
            </div>

            <h3 className="text-2xl font-bold mb-4">

              Worker Management

            </h3>

            <p className="text-gray-600">

              Manage workers, attendance, and records efficiently.

            </p>

          </div>

          {/* CARD 3 */}

          <div className="bg-gray-100 p-8 rounded-2xl shadow hover:shadow-xl transition">

            <div className="text-5xl mb-5">
              📊
            </div>

            <h3 className="text-2xl font-bold mb-4">

              Analytics Dashboard

            </h3>

            <p className="text-gray-600">

              Get real-time insights and business analytics.

            </p>

          </div>

        </div>

      </section>

      {/* STATS */}

      <section className="py-20 bg-blue-600 text-white">

        <div className="grid md:grid-cols-4 text-center gap-10">

          <div>

            <h1 className="text-5xl font-bold mb-3">
              10K+
            </h1>

            <p className="text-xl">
              Workers Managed
            </p>

          </div>

          <div>

            <h1 className="text-5xl font-bold mb-3">
              500+
            </h1>

            <p className="text-xl">
              Businesses
            </p>

          </div>

          <div>

            <h1 className="text-5xl font-bold mb-3">
              ₹5Cr+
            </h1>

            <p className="text-xl">
              Wages Distributed
            </p>

          </div>

          <div>

            <h1 className="text-5xl font-bold mb-3">
              99%
            </h1>

            <p className="text-xl">
              Satisfaction
            </p>

          </div>

        </div>

      </section>

      {/* FOOTER */}

      <footer className="bg-gray-900 text-white py-10 text-center">

        <h1 className="text-3xl font-bold mb-4">

          FairFundz

        </h1>

        <p className="text-gray-400">

          © 2026 FairFundz. All rights reserved.

        </p>

      </footer>

    </div>
  );
};

export default Home;