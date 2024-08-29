import { navlinks } from "../constants/NavLinks";

interface LinkProps {
	key: string;
	sitename: string;
	link: string;
}

const LinkButton = (props: LinkProps) => (
	<li className="navbuttons">
		<a href={props.link}>
			<button type="button">{props.sitename}</button>
		</a>
	</li>
);

const Navbar = () => {
	return (
		<header>
			<nav>
				<ul
					style={{
						listStyle: "none",
					}}
				>
					{navlinks.map((site, id) => (
						<LinkButton
							key={id.toString()}
							sitename={site.sitename}
							link={site.link}
						/>
					))}
				</ul>
			</nav>
		</header>
	);
};

export { LinkButton, Navbar };
