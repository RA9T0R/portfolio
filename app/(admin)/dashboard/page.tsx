"use client"

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { type Project,type BlogPost } from '@/lib/constants';
import {Loader2, Trash2, Edit, LogOut} from 'lucide-react';
import { type User } from '@supabase/supabase-js';

const AdminDashboard = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);

    const [user, setUser] = useState<User | null>(null);

    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    // Fetch Projects
    const fetchProjects = async () => {
        const { data, error } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
        if (error) console.error("Error fetching projects:", error);
        else if (data) setProjects(data);
    };

    // 5. Add function to fetch Blog Posts
    const fetchBlogPosts = async () => {
        const { data, error } = await supabase.from('blog_posts').select('*').order('date', { ascending: false });
        if (error) console.error("Error fetching blogs:", error);
        else if (data) setBlogPosts(data);
    };

    useEffect(() => {
        const fetchUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                setUser(user);
                await fetchProjects();
                await fetchBlogPosts();
            } else {
                router.push('/login');
            }
            setIsLoading(false);
        };
        fetchUser();
    }, [router]);


    // Delete Project
    const handleDeleteProject = async (title: string, id: number) => {
        if (confirm(`Delete project: "${title}"?`)) {
            const { error } = await supabase.from('projects').delete().eq('id', id);
            if (error) alert("Error deleting project: " + error.message);
            else fetchProjects();
        }
    };

    // 6. Add function to Delete Blog Post
    const handleDeleteBlog = async (title: string, id: number) => {
        if (confirm(`Delete blog post: "${title}"?`)) {
            const { error } = await supabase.from('blog_posts').delete().eq('id', id);
            if (error) alert("Error deleting post: " + error.message);
            else fetchBlogPosts();
        }
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        setUser(null);
        router.push('/login');
    };

    if (isLoading) {
        return <div className="w-full h-screen flex justify-center items-center"><Loader2 size={32} className="animate-spin text-primary" /></div>;
    }

    return (
        <div className="w-full mx-auto gap-6 py-3 font-space-grotesk">
            <button onClick={handleLogout} className="flex items-center mb-6 gap-2 text-sm text-red-500 cursor-pointer">
                <LogOut />
                <p>Logout</p>
            </button>

            {/* --- PROJECTS SECTION --- */}
            <div className="mb-10">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-semibold">Projects</h2>
                    <Link href="/projects/create" className="bg-primary text-white font-bold py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors inline-flex items-center gap-1">
                        + Create New Project
                    </Link>
                </div>
                <div className="flex flex-col gap-4">
                    {projects.length === 0 ? (
                        <p className="text-subtext">No projects found.</p>
                    ) : (
                        projects.map((project) => (
                            <div key={project.id} className="flex flex-wrap sm:flex-nowrap justify-between items-center p-4 bg-surface dark:bg-Dark_surface rounded-lg border border-subtext/20">
                                <div>
                                    <h3 className="font-semibold text-lg">{project.title}</h3>
                                    <p className="text-xs text-subtext/70">Slug: {project.slug}</p>
                                </div>
                                <div className="flex gap-4 flex-shrink-0">
                                    <Link href={`/projects/edit/${project.slug}`} className="text-blue-500 font-medium py-1 px-3 rounded-lg hover:bg-blue-500/10 transition-colors flex items-center gap-1">
                                        <Edit size={16} /> Edit
                                    </Link>
                                    <button onClick={() => handleDeleteProject(project.title, project.id)} className="cursor-pointer text-red-500 font-medium py-1 px-3 rounded-lg hover:bg-red-500/10 transition-colors flex items-center gap-1">
                                        <Trash2 size={16} /> Delete
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            <div className="mb-10">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-semibold">Blog Posts</h2>
                    <Link href="/blogs/create" className="bg-secondary text-white font-bold py-2 px-4 rounded-lg hover:bg-secondary/90 transition-colors inline-flex items-center gap-1">
                        + Create New Post
                    </Link>
                </div>
                <div className="flex flex-col gap-4">
                    {blogPosts.length === 0 ? (
                        <p className="text-subtext">No blog posts found.</p>
                    ) : (
                        blogPosts.map((post) => (
                            <div key={post.id} className="flex flex-wrap sm:flex-nowrap justify-between items-center p-4 bg-surface dark:bg-Dark_surface rounded-lg border border-subtext/20">
                                <div>
                                    <h3 className="font-semibold text-lg">{post.title}</h3>
                                    <p className="text-xs text-subtext/70">Slug: {post.slug}</p>
                                </div>
                                <div className="flex gap-4 flex-shrink-0">
                                    <Link href={`/blogs/edit/${post.slug}`} className="text-blue-500 font-medium py-1 px-3 rounded-lg hover:bg-blue-500/10 transition-colors flex items-center gap-1">
                                        <Edit size={16} /> Edit
                                    </Link>
                                    <button onClick={() => handleDeleteBlog(post.title, post.id)} className="cursor-pointer text-red-500 font-medium py-1 px-3 rounded-lg hover:bg-red-500/10 transition-colors flex items-center gap-1">
                                        <Trash2 size={16} /> Delete
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

        </div>
    );
};

export default AdminDashboard;