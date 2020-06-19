import React, { FunctionComponent } from 'react';
import Layout from '../components/Layout';
import SEO from '../components/Head/SEO';
import { Link, useStaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';

interface PostProps {
	data: {
		markdownRemark: {
			frontmatter: {
				author: string;
				abstract: string;
				banner: {
					childImageSharp: {
						fluid: {
							src: string;
						};
					};
				};
				date: string;
				path: string;
				title: string;
				topics: {}[];
			};
			html: string;
		};
	};
}

const Post: FunctionComponent<PostProps> = ({ data }) => {
	const { markdownRemark } = data;
	const { frontmatter, html } = markdownRemark;
	const { author, abstract, banner, date, path, title, topics } = frontmatter;
	const { fluid } = banner.childImageSharp;

	const renderTopics = (): FunctionComponent =>
		topics.map((topic: string, index: number) => {
			topic = topic.replace(/ /g, `-`);

			return (
				<li className="post-tag" key={index}>
					<Link className="link" to={`/topics/${topic.toLowerCase()}`} title={`Link to ${topic}`}>
						{topic}
					</Link>
				</li>
			);
		});

	return (
		<Layout>
			<SEO
				banner={fluid.src}
				bannerAlt={title}
				contentType={`NewsArticle`}
				date={date}
				description={abstract}
				pathname={path}
				title={title}
			/>
			<article className="Post">
				<div className="block">
					<div className="grid-flex">
						<div className="column-12">
							<h1 className="heading-1">{title}</h1>
							<Img fluid={fluid} alt={title} />
							<div className="post-author">{author}</div>
							<p className="post-date">{date}</p>
							<div dangerouslySetInnerHTML={{ __html: html }}></div>
							<ul className="post-tags">{renderTopics()}</ul>
						</div>
					</div>
				</div>
			</article>
		</Layout>
	);
};

export default Post;

export const pageQuery = graphql`
	query($pathSlug: String!) {
		markdownRemark(frontmatter: { path: { eq: $pathSlug } }) {
			html
			frontmatter {
				author
				abstract
				date
				path
				title
				topics
				banner {
					childImageSharp {
						fluid {
							...GatsbyImageSharpFluid
						}
					}
				}
			}
		}
	}
`;
