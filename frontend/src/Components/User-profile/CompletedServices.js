import React from 'react'

function CompletedServices() {
  return (
    <div>
      <div class="inline-block min-w-full mt-7 shadow text-center rounded-lg overflow-hidden">
        <table class="min-w-full leading-normal">
          <thead>
            <tr>
              <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-200  text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Service Provider Name
              </th>
              <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100  text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Date Of Booking
              </th>
              <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-200  text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Date of service
              </th>
              <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100  text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Status
              </th>
              <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-200  text-center text-xs font-semibold text-gray-600 uppercase tracking-wide">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <div class="flex items-center">
                  <div class="flex-shrink-0 w-10 h-10">
                    <img
                      class="w-full h-full rounded-full"
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
                      alt=""
                    />
                  </div>
                  <div class="ml-3">
                    <p class="text-gray-900 whitespace-no-wrap">
                      Vera Carpenter
                    </p>
                  </div>
                </div>
              </td>
              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p class="text-gray-900  text-center whitespace-no-wrap">
                  Jan 20, 2020
                </p>
              </td>
              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p class="text-gray-900  text-center whitespace-no-wrap">
                  Jan 21, 2020
                </p>
              </td>

              <td class="px-5 py-5 border-b  text-center border-gray-200 bg-white text-sm">
                <span class="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                  <span
                    aria-hidden
                    class="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                  ></span>
                  <span class="relative">Completed</span>
                </span>
              </td>
              <td class="py-5 flex flex-col border-b border-gray-200 bg-white text-sm">
                <button class="h-10 w-1/2  m-2 bg-transparent hover:bg-red-800 text-red-800 font-bold py-2 border border-red-700 rounded ">
                  Delete
                </button>
              </td>
            </tr>
            <tr>
              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <div class="flex items-center">
                  <div class="flex-shrink-0 w-10 h-10">
                    <img
                      class="w-full h-full rounded-full"
                      src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
                      alt=""
                    />
                  </div>
                  <div class="ml-3">
                    <p class="text-gray-900 whitespace-no-wrap">Blake Bowman</p>
                  </div>
                </div>
              </td>
              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p class="text-gray-900  text-center whitespace-no-wrap">
                  Jan 01, 2020
                </p>
              </td>
              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p class="text-gray-900  text-center whitespace-no-wrap">
                  Jan 01, 2020
                </p>
              </td>

              <td class="px-5 py-5 border-b  text-center border-gray-200 bg-white text-sm">
                <span class="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                  <span
                    aria-hidden
                    class="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                  ></span>
                  <span class="relative">Completed</span>
                </span>
              </td>
              <td class="py-5 flex flex-col border-b border-gray-200 bg-white text-sm">
                <button class="h-10 w-1/2  m-2 bg-transparent hover:bg-red-800 text-red-800 font-bold py-2 border border-red-700 rounded ">
                  Delete
                </button>
              </td>
            </tr>
            <tr>
              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <div class="flex items-center">
                  <div class="flex-shrink-0 w-10 h-10">
                    <img
                      class="w-full h-full rounded-full"
                      src="https://images.unsplash.com/photo-1540845511934-7721dd7adec3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
                      alt=""
                    />
                  </div>
                  <div class="ml-3">
                    <p class="text-gray-900 whitespace-no-wrap">Dana Moore</p>
                  </div>
                </div>
              </td>
              <td class="px-5 py-5 border-b  text-center border-gray-200 bg-white text-sm">
                <p class="text-gray-900 whitespace-no-wrap">Jan 03, 2020</p>
              </td>
              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p class="text-gray-900  text-center whitespace-no-wrap">
                  Jan 10, 2020
                </p>
              </td>

              <td class="px-5 py-5 border-b  text-center border-gray-200 bg-white text-sm">
                <span class="relative inline-block px-3 py-1 font-semibold text-orange-900 leading-tight">
                  <span
                    aria-hidden
                    class="absolute inset-0 bg-orange-200 opacity-50 rounded-full"
                  ></span>
                  <span class="relative">Suspended</span>
                </span>
              </td>
              <td class="py-5 flex flex-col border-b border-gray-200 bg-white text-sm">
                <button class="h-10 w-1/2  m-2 bg-transparent hover:bg-red-800 text-red-800 font-bold py-2 border border-red-700 rounded ">
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
          <span class="text-xs xs:text-sm text-gray-900">
            Showing 1 to 4 of 50 Entries
          </span>
          <div class="inline-flex mt-2 xs:mt-0 items-center">
            <button class="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-l">
              Prev
            </button>
            &nbsp; &nbsp;
            <button class="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-r">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompletedServices
