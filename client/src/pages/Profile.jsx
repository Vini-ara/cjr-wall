import MDEditor, { commands } from "@uiw/react-md-editor";
import { useEffect, useState } from "react";
import rehypeSanitize from "rehype-sanitize";
import { DepartmentsRadioInput } from "../components/DepartmentsRadioInput";
import { useAuth } from "../contexts/AuthContext";
import api from "../services/api";
import { UrlInputs } from '../components/UrlInputs'
import {
  TwitterSvg,
  GitHubSvg,
  InstagramSvg,
  LinkedInSvg
} from '../components/SocialButtons'

export function Profile() {
  const { user } = useAuth();
  const [markdown, setMarkdown] = useState('');
  const [socialLinks, setSocialLinks] = useState({
    instagram: '',
    twitter: '',
    github: '',
    linkedin: ''
  });
  const [department, setDepartment] = useState('');

  const fetchUser = async (userId) => {
    try {
      const data = await api.data.getUserInfo(userId);

      if(data) {
        const {markdown, socialLinks, department} = data;

        setMarkdown(markdown);
        setSocialLinks(socialLinks);
        setDepartment(department);
      } else {
        setMarkdown('');
      }
    } catch(error) {
      console.error(error)
    }
  }

  const handleSave = async () => {
    try {
      const data = await api.data.postUserInfo(user.sub, markdown, socialLinks, department);

      setMarkdown(data.markdown)
      setSocialLinks(data.socialLinks)
      setDepartment(data.department)
      alert('Perfil salvo com sucesso')
    } catch (error){
      console.error(error)
      alert("Não foi possível salvar alterações tente novamente")
    }
  }

  const handleDepartmentChange = (e) => {
    setDepartment(e.target.value)
  }

  const handleSocialLinkChange = (event) => {
    setSocialLinks({...socialLinks, [event.target.name]: event.target.value })
  }

  const handleMarkdownChange = (data, _viewUpdate) => {
    setMarkdown(data)
  }

  useEffect(() => {
    fetchUser(user.sub)
  }, []);

  return(
    <div className="grid grid-cols-1 md:grid-cols-8 m-auto mt-10 mb-2 w-[80%] gap-3">
      <div 
        className="shadow-md shadow-gray-900 flex flex-col items-center rounded-[1rem] bg-[#22223b] 
                  col-span-1 md:col-span-3 p-5 h-fit gap-1"
      >
        <img className="rounded-full" src={user.picture} alt="user profile pic"/>
        <p className="font-medium text-center mb-4">{user.name}</p>
        <DepartmentsRadioInput 
          onChange={handleDepartmentChange}
          value={department} 
        />
        <p className="my-1">Perfis das redes sociais</p>
        <UrlInputs 
          Icon={InstagramSvg}
          name="instagram"
          labelText="Instagram"
          placeHolder="instagram.com/usuario"
          onChange={handleSocialLinkChange} 
          value={socialLinks.instagram}
        />
        <UrlInputs 
          Icon={TwitterSvg}
          name="twitter"
          labelText="Twitter"
          placeHolder="twitter.com/usuario"
          onChange={handleSocialLinkChange} 
          value={socialLinks.twitter}
        />
        <UrlInputs 
          Icon={GitHubSvg}
          name="github"
          labelText="Github"
          placeHolder="github.com/usuario"
          onChange={handleSocialLinkChange} 
          value={socialLinks.github}
        />
        <UrlInputs 
          Icon={LinkedInSvg}
          name="linkedin"
          labelText="Linkedin"
          placeHolder="linkedin.com/in/usuario"
          onChange={handleSocialLinkChange} 
          value={socialLinks.linkedin}
        />

        <button
          type="button"
          className="inline-block mt-2 px-6 py-2.5 bg-green-700 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-600 hover:shadow-lg focus:bg-green-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-700 active:shadow-lg transition duration-150 ease-in-out"
          onClick={handleSave}
        >
          Salvar
        </button>
      </div>
      <MDEditor
        value={markdown}
        onChange={handleMarkdownChange}
        visibleDragbar={false}
        extraCommands={[commands.codeEdit, commands.codePreview]}
        autoFocus
        preview="edit"
        className="col-span-1 md:col-span-5 min-h-[40vh] md:min-h-[80vh]
                  h-full  rounded-l-none]"
        height="100%"
        previewOptions={{
          rehypePlugins: [[rehypeSanitize]],
        }}
      />
    </div>
  ); 
}
