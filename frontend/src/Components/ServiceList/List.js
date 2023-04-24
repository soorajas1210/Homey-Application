import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { sList, sTypeList } from "../../actions/adminActions";


function List() {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(sTypeList());
  }, [dispatch]);

  useEffect(() => {
    dispatch(sList());
  }, [dispatch]);

  const TypeList = useSelector((state) => state.serviceTypeList);

  const { serviceType } = TypeList;

  const serviceList = useSelector((state) => state.servicesList);
  const { services, loading, error } = serviceList;

  const handleClick = (id) => {
  navigate(`/ServiceBook/${id} `);
    console.log(id);
  };

const handleType = (id) => {
  navigate(`/serviceType/${id} `);
  console.log(id);

}


  return (
    <div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 ">
        {serviceType.map((Type) => (
          <div class="cursor-pointer rounded-xl bg-white  shadow-2xl hover:shadow-xl">
            <div class="relative flex items-end overflow-hidden rounded-xl">
              <img
                onClick={() => handleType(Type._id)}
                className="h-40"
                src={Type.image}
                alt="wallpaper"
              />
            </div>

            <div class="mt-1 p-2  ">
              <h2 class="text-slate-700 text-xl  ">{Type.serviceType}</h2>
              <p
                class="mt-1 text-sm text-slate-400 "
                onClick={() => handleType(Type._id)}
              >
                {Type.serviceTypeDescription}
              </p>

              <ul class="list-none mt-5   ">
                {services
                  .filter((service) => service.serviceType === Type.serviceType)
                  .map((service) => (
                    <li
                      key={service._id}
                      onClick={() => handleClick(service._id)}
                      className="mt-1  text-green-800 text-base"
                    >
                      {service.serviceName}
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default List;
