import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";

import ComplianceStats from "../components/ComplianceStats";

import ComplianceTable from "../components/ComplianceTable";

import {
  generateCompliance,
  getCompliance,
} from "../services/complianceService";

const Compliance = () => {

  const [reports, setReports] = useState([]);

  const loadData = async () => {

    const data = await getCompliance();

    setReports(data.reports);

  };

  useEffect(() => {

    loadData();

  }, []);

  const generate = async () => {

    await generateCompliance();

    loadData();

  };

  const latest = reports[0];

  return (

    <div className="flex bg-gray-100 min-h-screen">

      <Navbar />

      <div className="ml-[230px] w-full p-8">

        <div className="flex justify-between items-center">

          <div>

            <h1 className="text-4xl font-bold">

              Compliance Dashboard

            </h1>

            <p className="text-gray-500">

              Labour Law Monitoring

            </p>

          </div>

          <button

            onClick={generate}

            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl"

          >

            Generate Report

          </button>

        </div>

        {latest && (

          <>

            <div className="mt-8">

              <ComplianceStats report={latest} />

            </div>

            <ComplianceTable

              violations={latest.violations}

            />

          </>

        )}

      </div>

    </div>

  );

};

export default Compliance;