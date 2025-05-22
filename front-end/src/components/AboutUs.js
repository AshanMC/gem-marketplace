import React from "react";
import Navbar from "../components/Navbar/Navbar";

const teamMembers = [
  {
    name: "Ashan Madhushanka",
    image: "https://res.cloudinary.com/dcj5ifk4o/image/upload/v1747945862/IMG_3351_pvshka.jpg",
    phone: "071-0660827",
    qualification: "BSc (Hons) Software Engineering",
    description: "Lead developer passionate about full-stack development and cloud-native apps."
  },
  {
    name: "Nadeeshan Madushanka",
    image: "https://res.cloudinary.com/dcj5ifk4o/image/upload/v1747945861/IMG_6026_hpm4kc.jpg",
    phone: "071-2361886",
    qualification: "Certificate in Pearls and Other Organic Gem Materials",
    description: "Qualified Professional in the Gem industry"
  },
  {
    name: "Rohan Chandradasa",
    image: "https://res.cloudinary.com/dcj5ifk4o/image/upload/v1747945861/IMG_6030_qdpzeg.jpg",
    phone: "071-2310565",
    qualification: "Diploma in Fashioning of Gemstones, Jewellery Designing & Manufacturing",
    description: "A trusted gem expert with over 20 years of experience in sourcing and selling high-quality gemstones."
  },
];

const certificates = [
  {
    title: "National Gem and Jewellery Authority (NGJA)",
    image: "https://res.cloudinary.com/dcj5ifk4o/image/upload/v1747946581/th_jcu95x.jpg"
  },
  {
    title: "Gemmological Institute of Sri Lanka (GIL)",
    image: "https://res.cloudinary.com/dcj5ifk4o/image/upload/v1747946581/Gemstone-certificate_uotrxz.jpg"
  },
  {
    title: "University of Moratuwa – Certificate Course in Gemmology",
    image: "https://res.cloudinary.com/dcj5ifk4o/image/upload/v1747946581/Chochin-University-of-Science-and-Technology_xnjjus.jpg"
  },
];

export default function AboutUs() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-100 py-12 px-6">
        <h1 className="text-4xl font-bold text-center text-gray-600 mb-10">About Us</h1>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {teamMembers.map((member, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 text-center">
              <img src={member.image} alt={member.name} className="w-32 h-32 rounded-full mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-800 mb-1">{member.name}</h2>
              <p className="text-sm text-gray-600 mb-1">📞 {member.phone}</p>
              <p className="text-sm text-gray-600 mb-2">🎓 {member.qualification}</p>
              <p className="text-gray-700 text-sm italic">{member.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-zinc-600 mb-6">Our Certifications</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {certificates.map((cert, index) => (
              <div key={index} className="text-center bg-white shadow rounded-lg p-4">
                <img src={cert.image} alt={cert.title} className="w-full h-40 object-cover rounded-md mb-2" />
                <h3 className="text-lg font-semibold text-gray-700">{cert.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
