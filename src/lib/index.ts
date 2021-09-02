// essentials
import Dialog from './core/Dialog.svelte';
import Image from './core/Image.svelte';
import LazyLoad from './core/LazyLoad.svelte';
import Link from './core/Link.svelte';
import Modal from './core/Modal.svelte';
import Observe from './core/Observe.svelte';
import Overlay from './core/Overlay.svelte';
import Video from './core/Video.svelte';
export { Dialog, Image, LazyLoad, Link, Modal, Observe, Overlay, Video };

// functional
import Pagination from './core/Pagination.svelte';
import SearchBar from './core/SearchBar.svelte';
import ThemeSwitcher from './core/ThemeSwitcher.svelte';
export { Pagination, SearchBar, ThemeSwitcher };

// styled
import ButtonLink from './core/ButtonLink.svelte';
import GradientBorder from './core/GradientBorder.svelte';
import ProgressBar from './core/ProgressBar.svelte';
import ScrollTop from './core/ScrollTop.svelte';
import WeavedImage from './core/WeavedImage.svelte';
export { ButtonLink, GradientBorder, ProgressBar, ScrollTop, WeavedImage };

export default {
	// essentials
	Dialog,
	Image,
	LazyLoad,
	Link,
	Modal,
	Observe,
	Overlay,
	Video,

	// functional
	Pagination,
	SearchBar,
	ThemeSwitcher,

	// styled
	ButtonLink,
	GradientBorder,
	ProgressBar,
	ScrollTop,
	WeavedImage,
};
