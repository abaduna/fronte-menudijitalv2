import { API } from "@/API";
import { food } from "@/app/admin/formulario/[id]/page";
import { bodyProps } from "@/app/admin/page";
import { Menu } from "@/app/page";
export const useFetch = () => {
  const fetchPost = async (datos: bodyProps) => {
    try {
      const formData = new FormData();

      formData.append("name", datos.title);
      formData.append("price", datos.price);
      formData.append("stock", datos.stock);
      formData.append("description", "description");
      formData.append("file", datos.imageUpLoading);
      formData.append("category", "perfumes");
      await API.post("api/food", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (error) {
      console.log(`algo salio en en  fetchPost`);
      console.error(error);
    }
  };
  const deletID = async (id: string) => {
    try {
      await API.delete(`api/food/${id}`);
    } catch (error) {
      console.log(`algo salio en en  fetchPost`, error);
    }
  };
  const getData = async (endpoint:string) => {
    try {
      const data = await API.get(endpoint);
      return data;
    } catch (error) {
      console.log(`algo salio en mal  getData`, error);
    }
  };
  const getDataForid = async (id: string) => {
    try {
      const data = await API.get(`api/food/${id}`);
      console.log(data);
      
      return data;
    } catch (error) {
      console.log(`algo salio en en  getDataForid`, error);
    }
  }; ///menu/:id
  const upDateID = async (id: string, food: food) => {
    try {
      const data = await API.put(`api/food/${id}`, food);
      return data;
    } catch (error) {
      console.log(`algo salio en en  upDateID`, error);
    }
  };
  const post =async(email:string,password:string,endpoint:string)=>{
    try {
   const token = await API.post(endpoint, {
      email,
        password
      });
      console.error('token', token)
      localStorage.setItem("token",token.data)
    } catch (error) {
      console.log(`algo salio en en  post`, error);
    }
  }
  const postOrdenes = async(data:any,endpoint:string)=>{
    console.error( data)
    
    
    try {
     const res= await API.post(endpoint,  data, {
      headers: {
          'Content-Type': 'application/json'
      }
  });
        console.log('res', res)
    } catch (error) {
      console.error(`algo salio en en  postOrdenes`, error);
    }
  }
  const put = async(food:any,endpoint:string)=>{
     const res:String =await API.put(endpoint,food)
      console.log('res', res)
  }
  const getDataV2 = async (endpoint:string) => {
    try {
      const data = await API.get(endpoint);
      return data;
    } catch (error) {
      console.log(`algo salio en mal  getData`, error);
    }
  };
  return { fetchPost, deletID, getData, getDataForid, upDateID,post ,put,postOrdenes,getDataV2};
};
