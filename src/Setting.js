import React, { useRef, useState } from 'react';
import 'antd/dist/antd.css';
import './Settings.css';
import Avatar from './Avatar';
import { login, logout, selectUser } from './features/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import useLocalStorage from './hooks/useLocalStorage';
import { message, Popconfirm } from 'antd';
import { useHistory } from 'react-router-dom';
import TextArea from 'antd/lib/input/TextArea';



function Setting() {
  const history = useHistory();
  const user = useSelector(selectUser);
  const [__token__, setLocalStorage] = useLocalStorage('__token__');
  const [avatar, setavatar] = useState(false);
  const dispatch = useDispatch();
  const [fileDisabled, setfileDisabled] = useState(true);
  const [bio, setBio] = useState(user.bio || '');
  const [fullName, setFullName] = useState(user.fullName);
  const [twitter, setTwitter] = useState(user.twitter || '');
  const ref = useRef();


  const saveAvatar = async () => {
    if (!avatar) return;
    const formdata = new FormData();
    formdata.append('avatar', avatar);
    formdata.append('Authorization', __token__);
    const config = {
      method: 'POST',
      body: formdata
    }
    const response = await fetch('http://localhost:8000/api/u/avatar', config);
    const result = await response.json();
    if (result?.status === false) {
      ref.current.value = '';
      setfileDisabled(true);
      return message.error(result.message);
    } else {
      message.success('Your avatar has been uploaded 🐱‍🏍');
      setfileDisabled(true);
      dispatch(login(result));
      setLocalStorage(result.__token__);
      ref.current.value = '';
    }
  }

  const handleChangeAvatar = async e => {

    const allowedExtensions = ['jpg', 'png'], sizeLimit = 1_000_000;

    const { name: fileName, size: fileSize } = e.target.files[0];

    const fileExtension = fileName.split(".").pop();
    if (!allowedExtensions.includes(fileExtension)) {
      e.target.value = '';
      return message.error("file type not allowed");
    } else if (fileSize > sizeLimit) {
      e.target.value = '';
      return message.error("file size too large");
    }

    setfileDisabled(false);
    setavatar(e.target.files[0]);
  }


  const handleDeleteAccount = () => {
    async function _fetch() {
      const formdata = new FormData();
      formdata.append('Authorization', __token__);

      const requestOptions = {
        method: 'POST',
        body: formdata
      };

      const response = await fetch("http://localhost:8000/api/u/delete", requestOptions);
      const result = await response.json();
      console.log(result);
      if (result === null) {
        message.error('something went wrong akkwrd !');
      }
    }
    _fetch();
    dispatch(logout());
    history.push('/');
  }


  const handleUpdate = async () => {
    const formdata = new FormData();
    formdata.append('fullName', fullName);
    formdata.append('bio', bio);
    formdata.append('twitter', twitter);
    formdata.append('Authorization', __token__);

    var requestOptions = {
      method: 'POST',
      body: formdata
    };

    const response = await fetch("http://localhost:8000/api/u/update", requestOptions);
    const result = await response.json();
    dispatch(login(result));
    setLocalStorage(result.__token__);
    message.success('updated 🐱‍🏍');
  }

  return (
    <>
      <div className="setting__body">
        <div>
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <div className="px-4 sm:px-0">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Profile</h3>
                <p className="mt-1 text-sm text-gray-600">
                  Your photo appears on your Profile page and with your stories across Helpystack.
                </p>
              </div>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2">
              <div>
                <div className="shadow sm:rounded-md sm:overflow-hidden">
                  <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                    <div>
                      <label style={{ textAlign: 'center' }} className="block text-sm font-medium text-gray-700">
                        Photo
                      </label>
                      <div style={{ justifyContent: 'center' }} className="mt-1 flex items-center">
                        <span className="avatar__settings">
                          <Avatar />
                        </span>

                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Cover photo
                      </label>
                      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                        <div className="space-y-1 text-center">
                          <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                          </svg>
                          <div className="flex text-sm text-gray-600">
                            <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                              <span>Upload a file</span>
                              <input ref={ref} type="file" name="avatar" accept=".jpg, .png" onChange={handleChangeAvatar} />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                          </div>
                          <p className="text-xs text-gray-500">
                            PNG, JPG
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                    <button disabled={fileDisabled} onClick={saveAvatar} className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Divider />
        <div className="mt-10 sm:mt-0">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <div className="px-4 sm:px-0">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Personal Information</h3>
                <p className="mt-1 text-sm text-gray-600">
                  Use a permanent address where you can receive mail.
                </p>
              </div>
            </div>

            <div className="mt-5 md:mt-0 md:col-span-2">
              <div method="POST">
                <div className="shadow overflow-hidden sm:rounded-md">
                  <div className="px-4 py-5 bg-white sm:p-6">
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Name</label>
                        <input onChange={e => setFullName(e.target.value)} defaultValue={user.fullName} type="text" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input value={user.email} type="text" disabled className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                      </div>
                    </div>
                  </div>
                  <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                    <button onClick={handleUpdate} disabled={fullName.length <= 0 || user.fullName === fullName} className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Divider />

        <div className="mt-10 sm:mt-0">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <div className="px-4 sm:px-0">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Bio</h3>
                <p className="mt-1 text-sm text-gray-600">
                  Your bio appears on your Profile and next to your stories. Max 160 characters.
                </p>
              </div>
            </div>

            <div className="mt-5 md:mt-0 md:col-span-2">
              <div>
                <div className="shadow overflow-hidden sm:rounded-md">
                  <div className="px-4 py-5 bg-white sm:p-6">

                    <div>
                      <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                        Add your bio
                      </label>
                      <div className="mt-1">
                        <TextArea onChange={e => setBio(e.target.value)} rows={4} showCount maxLength={100} defaultValue={user.bio} />
                      </div>
                    </div>
                  </div>
                  <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                    <button onClick={handleUpdate} disabled={bio.length === 0 || user.bio === bio} className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>



        <Divider />

        <div className="mt-10 sm:mt-0">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <div className="px-4 sm:px-0">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Twitter</h3>
                <p className="mt-1 text-sm text-gray-600">
                  Show link to your Twitter account on your profile page
                </p>
              </div>
            </div>

            <div className="mt-5 md:mt-0 md:col-span-2">
              <div>
                <div className="shadow overflow-hidden sm:rounded-md">
                  <div className="px-4 py-5 bg-white sm:p-6">

                    <div>
                      <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                        Your profile will include a link to your Twitter account
                      </label>
                      <div className="mt-1">
                        <input onChange={e => setTwitter(e.target.value)} defaultValue={user.twitter} type="text" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                      </div>
                    </div>
                  </div>
                  <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                    <button onClick={handleUpdate} disabled={twitter.length === 0 || user.twitter === twitter} className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Divider />

        <div className="mt-10 sm:mt-0">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <div className="px-4 sm:px-0">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Delete account</h3>
                <p className="mt-1 text-sm text-gray-600">
                  Permanently delete your account and all of your content.
                </p>
              </div>
            </div>

            <div className="mt-5 md:mt-0 md:col-span-2">
              <div>
                <div className="shadow overflow-hidden sm:rounded-md">
                  <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                    <Popconfirm
                      title="Confirm account deletion"
                      onConfirm={handleDeleteAccount}
                      okText="Yes Delete"
                      cancelText="No"
                    >
                      <button style={{ backgroundColor: '#f43f5e' }} type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Delete account
                      </button>
                    </Popconfirm>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}

function Divider() {
  return (
    <div className="hidden sm:block" aria-hidden="true">
      <div className="py-5">
        <div className="border-t border-gray-200"></div>
      </div>
    </div>
  );
}

export default Setting;
