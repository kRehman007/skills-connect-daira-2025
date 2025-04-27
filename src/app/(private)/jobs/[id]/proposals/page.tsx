// 'use client'; // Ensure this component is client-side rendered

// import { getProposalById, getProposalsForJob } from '@/server/functions/proposal';
// import { useParams } from 'next/navigation';
// import { useEffect, useState } from 'react';

// const ProposalsPage = () => {
//   const { id } = useParams(); // Get 'id' from URL params
//   const [offset,setOffset]=useState(0)
//   const [limit,setLimit]=useState(8)

//   const fakeProposalsData = [
//     {
//       id: 'fghjk',
//       title: 'Proposal 1',
//       description: 'Experienced software engineer with 5 years of experience.',
//     },
//     {
//       id: '2', // Matching job ID
//       title: 'Proposal 2',
//       description: 'Frontend developer with expertise in React and Tailwind.',
//     },
//     {
//       id: '3', // Matching job ID
//       title: 'Proposal 3',
//       description: 'Full-stack developer with knowledge in Node.js and MongoDB.',
//     },
//   ];

//   async function getProposal(){
//     const allprop=await getProposalsForJob(id,options:{
//       offset,limit
//     })

//   }

//   useEffect(()=>{
//     const allProposals=
//   },[])

//   // Simulate loading state (in case `id` is not available initially)
//   if (!id) {
//     return <div>Loading...</div>;
//   }

//   // Filter proposals based on the job ID (id must be the same format as the proposals' id)
//   const filteredProposals = fakeProposalsData.filter(
//     (proposal) => proposal.id === id // Make sure proposal.id matches the id from URL
//   );

//   return (
//     <div className="p-6">
//       <h1 className="text-3xl font-bold text-center mb-6">Proposals for Job {id}</h1>

//       <div>
//         <h3 className="text-xl font-semibold mb-4">Proposals</h3>

//         {/* Render filtered proposals */}
//         {filteredProposals.length > 0 ? (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {filteredProposals.map((proposal) => (
//               <div
//                 key={proposal.id}
//                 className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-200"
//               >
//                 <h4 className="text-lg font-semibold text-blue-600">{proposal.title}</h4>
//                 <p className="text-gray-700 mt-2">{proposal.description}</p>
//                 <button className="mt-4 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
//                   View Profile
//                 </button>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p className="text-center text-red-500">No proposals found for this job.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProposalsPage;
